import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function serviceNowProxy(env: Record<string, string>) {
  return {
    name: 'servicenow-sos-proxy',
    configureServer(server) {
      server.middlewares.use('/api/servicenow/sos-alert', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        const instanceUrl = env.SERVICENOW_INSTANCE_URL?.replace(/\/$/, '')
        const username = env.SERVICENOW_USERNAME
        const password = env.SERVICENOW_PASSWORD

        if (!instanceUrl || !username || !password) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Missing ServiceNow environment variables' }))
          return
        }

        const chunks = []
        for await (const chunk of req) {
          chunks.push(Buffer.from(chunk))
        }

        const payload = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
        const serviceNowPayload = {
          u_location: payload.location,
          u_message: payload.message,
          u_senior_name: payload.seniorName,
          u_senior_phone: payload.seniorPhone,
          u_status: payload.status || 'New',
        }

        try {
          const response = await fetch(`${instanceUrl}/api/now/table/u_sos_alert`, {
            method: 'POST',
            headers: {
              Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceNowPayload),
          })

          res.statusCode = response.status
          res.end(await response.text())
        } catch (error) {
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'Unable to connect to ServiceNow' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      figmaAssetResolver(),
      serviceNowProxy(env),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used - do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})

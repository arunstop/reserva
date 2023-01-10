import { connect } from 'mongoose'
export default defineNitroPlugin(async (app) => {
  const config = useRuntimeConfig()
  try {
    await connect(config.mongodbUri)
    console.log('[Mongoose] Connection success')
  } catch (e) {
    console.log('[Mongoose] Connection error =>', e)
  }
})

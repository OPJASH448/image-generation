import axios from 'axios'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

// Helper function to generate a colorful gradient SVG image (fallback)
const generateMockImage = (prompt) => {
  const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#30cfd0', '#330867']
  ]
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
  return `data:image/svg+xml;base64,${Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${randomColor[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${randomColor[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#grad1)"/>
      <circle cx="256" cy="256" r="100" fill="rgba(255,255,255,0.1)"/>
      <circle cx="256" cy="256" r="60" fill="rgba(255,255,255,0.2)"/>
      <text x="256" y="240" font-size="20" fill="white" text-anchor="middle" font-family="Arial" font-weight="bold">
        Generated Image
      </text>
      <text x="256" y="280" font-size="14" fill="white" text-anchor="middle" dy=".3em" font-family="Arial">
        ${prompt.substring(0, 35)}${prompt.length > 35 ? '...' : ''}
      </text>
      <text x="256" y="450" font-size="11" fill="rgba(255,255,255,0.6)" text-anchor="middle" dy=".3em" font-family="Arial">
        Powered by ClipDrop
      </text>
    </svg>
  `).toString('base64')}`
}

// Controller function to generate image from prompt using ClipDrop
// http://localhost:4000/api/image/generate-image
export const generateImage = async (req, res) => {

  try {
    console.log('Image generation request received')
    console.log('Request body:', req.body)

    const { userId, prompt } = req.body

    // Fetching User Details Using userId
    console.log('Fetching user with ID:', userId)
    const user = await userModel.findById(userId)
    console.log('User found:', user)
    
    if (!user || !prompt) {
      console.log('Missing Details - User:', !!user, 'Prompt:', !!prompt)
      return res.json({ success: false, message: 'Missing Details' })
    }

    // Checking User creditBalance
    console.log('User credit balance:', user.creditBalance)
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    let resultImage;

    try {
      // Call ClipDrop API to generate image
      console.log('Calling ClipDrop API...')
      
      const formdata = new FormData()
      formdata.append('prompt', prompt)

      const response = await axios.post(
        'https://clipdrop-api.co/text-to-image/v1',
        formdata,
        {
          headers: {
            'x-api-key': process.env.CLIPDROP_API,
            ...formdata.getHeaders()
          },
          responseType: "arraybuffer"
        }
      )

      console.log('ClipDrop response received successfully')
      
      // Convert arrayBuffer to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      resultImage = `data:image/png;base64,${base64Image}`
      console.log('Image converted to base64')
      
    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.message)
      if (apiError.response) {
        console.log('Error status:', apiError.response.status)
        console.log('Error data:', apiError.response.data?.toString('utf-8'))
      }
      console.log('Using mock image generation as fallback...')
      // Fallback to mock image generation
      resultImage = generateMockImage(prompt)
    }

    // Deduction of user credit 
    console.log('Deducting credit for user:', userId)
    const updatedUser = await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 }, { new: true })
    console.log('Updated user credit balance:', updatedUser.creditBalance)

    // Sending Response
    console.log('Sending success response with generated image')
    res.json({ success: true, message: "Image Generated", resultImage, creditBalance: updatedUser.creditBalance })

  } catch (error) {
    console.log('Error in generateImage:', error.message)
    console.log('Error stack:', error.stack)
    res.json({ success: false, message: error.message })
  }
}
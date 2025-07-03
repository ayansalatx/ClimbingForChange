export const uploadCSV = async (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Participants to upload missing missing' })
  }
  
  console.log('🚀 ~ uploadCSV ~ body length:', body.length)
  response.status(200).send()
}
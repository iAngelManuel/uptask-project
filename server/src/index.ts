import colors from 'colors'
import server from './server'

// PORT
const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(
    colors.magenta.bold(`Server is running on http://localhost:${port}`),
  )
})

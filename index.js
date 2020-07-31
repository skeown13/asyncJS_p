const fs = require("fs")
const superagent = require("superagent")

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      // err that is later available in the catch method
      if (err) reject("I could not find that file")

      // "data" will be the value that the promise returns to us. Also what we will be able to use in the .then handler of our http request promise
      resolve(data)
    })
  })
}

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`)

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message)

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) return console.log(err.message)
        console.log("Random dog image saved to file!")
      })
    })
    .catch((err) => {
      if (err) return console.log(err.message)
    })
})

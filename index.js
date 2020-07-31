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

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file")
      resolve("Success")
    })
  })
}

readFilePro(`${__dirname}/dog.txt`)
  .then((result) => {
    console.log(`Breed: ${result}`)

    return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`)
  })
  // res is the result that is returned from the previous handler
  .then((res) => {
    console.log(res.body.message)

    return writeFilePro("dog-img.txt", res.body.message)
  })
  .then(() => {
    console.log("Random dog image saved to file!")
  })
  .catch((err) => {
    console.log(err)
  })

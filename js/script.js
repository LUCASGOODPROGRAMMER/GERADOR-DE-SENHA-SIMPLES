console.log("testando")
// captura de elementos
const generatePasswordButton = document.querySelector("#generate-password")
const generatedPasswordElement = document.querySelector("#generated-password")

// Novas funcionalidades
const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

// Funções
//letras, números e símbolos
const getLetterLowerCase = () => {
    // console.log(String.fromCharCode(64)) // comando usado para exibir o caracter correspondente ao seu código AscII, o código(64) inserido se chama Unicode
    
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString()
    
}

const getSymbol = () => {
    const symbols = "!@#$%.,=<>[]{}+-_*/|"
    // return symbols [4] // isso funciona pq string é um array de caracteres
    return symbols[Math.floor(Math.random() * symbols.length)] // .length é uma propriedade que retonar a quantidade de arrays de um objeto
}

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = ""
    // segunda versão
    const passwordLength = +lengthInput.value
    
    const generators = []

    if(lettersInput.checked) generators.push(getLetterLowerCase, getLetterUpperCase)
    if(numbersInput.checked) generators.push(getNumber)
    if(symbolsInput.checked) generators.push(getSymbol)
    if(generators.length === 0)return 
    for (let i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]()

            password += randomValue
        })
    }
    password = password.slice(0, passwordLength)

    generatedPasswordElement.style.display = "block"
    generatedPasswordElement.querySelector("h4").innerText = password
}
// Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(getLetterLowerCase,getLetterUpperCase,getNumber,getSymbol)
})

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", () => {
    const password = generatedPasswordElement.querySelector("h4").innerText

    if(!password) return

    navigator.clipboard.writeText(password) //api navigator usado para mandar para área de transferência
        .then(() => {
            copyPasswordButton.innerText= "Senha copiada com sucesso!"
            setTimeout(()=> {
                copyPasswordButton.innerText= "copiar"
            }, 2000)
        })
        .catch(() => {
            alert("Erro ao copiar a senha!")
        })
})
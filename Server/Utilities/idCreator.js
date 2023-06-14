const createId = (country) => {
    let id = "";
    let randomNumber = Math.floor(Math.random() * Math.pow(10, 11));

    id = (country === "Argentina") ? "MLAC"
        : (country === "Mexico") ? "MLMC"
            : (country === "Colombia") ? "MCOC"
                : id;

    id = `${id}${randomNumber}`
    return id

}

module.exports = {
    createId
}
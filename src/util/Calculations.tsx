import death from '../data/death.json';
import birth from '../data/births.json';
import netmigration from '../data/netmigrations.json';
import migrationDistribution from '../data/migrationDistribution.json';



export const calculations = (data) => {
    // console.log("calculation", data, "dath" , death[data.country])
    let finalPyramidData = {}
        finalPyramidData[2022] = JSON.parse(JSON.stringify(data.pyramid))
        finalPyramidData[2023] = JSON.parse(JSON.stringify(data.pyramid))
    finalPyramidData = deathCalculation(data.country, data.deathRate, finalPyramidData, data.birthRate)
    finalPyramidData = migrationCalculation(data.country, data.immigrationRate, finalPyramidData)
    return finalPyramidData
}

const deathCalculation = (country, deathRate, pyramid, birthRate) => {
    const newPyramid = JSON.parse(JSON.stringify(pyramid))
    for (let i = 2023; i < 2100; i++) {

        for (let j = 2; j < 101; j++) {
            // console.log(pyramid[2023][2])
            newPyramid[i][j][1] = pyramid[i][j - 1][1] * (1 - (death[country][i - 2023][j - 1] * parseInt(deathRate)))
            newPyramid[i][j][2] = pyramid[i][j - 1][2] * (1 - (death[country][i - 2023][j - 1] * parseInt(deathRate)))
            newPyramid[i][j][0] = j
        }
        const newborn = calculateNewborn(country, i, birthRate)
        newPyramid[i][1] = ['1', newborn / 200 * 105, - newborn / 200 * 100]

        newPyramid[i+1] = JSON.parse(JSON.stringify(newPyramid[i]))
        pyramid[i+1] = JSON.parse(JSON.stringify(newPyramid[i]))
    }   
    return newPyramid
}

const calculateNewborn = (country, year, birthRate) => {
    return birth[country][year] * birthRate
}

const migrationCalculation = (country, migrationRate, pyramid) => {
    const newPyramid = JSON.parse(JSON.stringify(pyramid))
    for (let i = 2023; i < 2100; i++) {
        for (let j = 1; j < newPyramid[i].length; j++) {
            newPyramid[i][j][1] = newPyramid[i][j][1] + netmigration[country][i] * migrationDistribution[j - 1]["distributionF"] * migrationRate / 100
            newPyramid[i][j][2] = newPyramid[i][j][2] - netmigration[country][i] * migrationDistribution[j - 1]["distributionM"] * migrationRate / 100
        }
    }
    return newPyramid
}

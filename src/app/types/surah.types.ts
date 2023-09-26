export type Surah = {
    number: number,
    name: string,
    englishName: string,
    englishNameTranslation: string,
    numberOfAyahs: number,
    revelationType: string
}

export type Question = {
    surah: Surah,
    ayahNumber: number,
    text?: string
}

export type GetAyahResponse = {
    code: number,
    status: string,
    data: any[]
}

export type Ayah = {
    number: number,
    surah: {
        number: number
    },
    text: string
}
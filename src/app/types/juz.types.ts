export type GetJuzResponse = {
    code: number,
    status: string,
    data: {
        surahs: Juz[]
    }
}

export type Juz = {
    number: number,
    englishName: string
}
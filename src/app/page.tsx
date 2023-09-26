import Leaderboard from "./components/Leaderboard"
import MurojaahApp from "./components/MurojaahApp"
import MurojaahGenerator from "./components/MurojaahGenerator"
import SurahForm from "./components/SurahForm"
import { Surah } from "./types/surah.types"

type GetSurahResponse = {
	code: number,
	status: string,
	data: Surah[]
}

export default async function Page() {
	//get surah
	const getSurah = async () => {
		const res = await fetch('http://api.alquran.cloud/v1/surah')
		const data = await res.json() as GetSurahResponse
		return data
	}

	const surahList = await getSurah()
	if (surahList.code !== 200) {
		return <div>ooppps there is an error</div>
	}

	return (
		<>
			<MurojaahApp>
				<SurahForm surahs={surahList.data} />
				<MurojaahGenerator />
				<Leaderboard />
			</MurojaahApp>
		</>
	)
}
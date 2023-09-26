import { useContext } from "react";
import { MurojaahContext, MurojaahContextState } from "../contexts/MurojaahContext";

export default function useMurojaah(){
    const murojaahContext = useContext<MurojaahContextState | null>(MurojaahContext)

    if(murojaahContext === null){
        throw new Error("murojaah context must be inside Murojaah Provider")
    }

    return murojaahContext
}
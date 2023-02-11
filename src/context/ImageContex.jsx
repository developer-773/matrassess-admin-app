import { createContext, useEffect, useState } from "react";

export const ImageContext = createContext()

export const ImageProvider = ({children}) => {

    const [img, setImg] = useState((localStorage.getItem('img')) || '');

    useEffect(() => {},[])
    if(img) {
        localStorage.setItem('img', (img))
    }

    return (
        <ImageContext.Provider value={{img, setImg}}>
            {children}
        </ImageContext.Provider>
    )
}
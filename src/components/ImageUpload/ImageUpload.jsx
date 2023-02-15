import React, { createContext, useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./ImageUpload.css"



export const ImageUpload = () => {

    const defaultImg = new Blob(["Avoid error for empty input file"], {type : 'text/plain'})
	let [firstPhotos, setFirstPhotos] = useState(null);
	let [secondPhotos, setSecondPhotos] = useState(null);
	let [thirdPhotos, setThirdPhotos] = useState(null);

    let arr = []
	const handleFirstInputChange = (evt) => {
        let target = evt.target.files
        if(!target.length) {
            setFirstPhotos(defaultImg)
        }
        for(let i=0; i<target.length; i++) {   
            setFirstPhotos(target[i]); 
        }
	};

    const handleSecondInputChange = (evt) => {
        if(!evt.target.files.length) {
            setSecondPhotos(defaultImg)
        }
            setSecondPhotos(evt.target.files[0]);   
	};

    const handleThirdInputChange = (evt) => {
        if(!evt.target.files.length) {
            setThirdPhotos(defaultImg)
        }
            setThirdPhotos(evt.target.files[0]);   
       
	};


    const {
		register,
		handleSubmit,
		formState,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		mode: "onBlur",
		defaultValues: {	
			first_image: "",
            second_image: '',
            third_image: ''
		},
	});



    
	return (
        <div style={{ margin: 50 }}>
            <form onSubmit={handleSubmit(submit)}>
                <button type="submit">Test</button>
            <span className="image-upload position-relative">
                
			<input
				type="file"
                {...register("first_image")}
				className="opacity-0 position-absolute"
				onChange={handleFirstInputChange}
                />
                 {firstPhotos ? <img className="uploaded-img" src={URL.createObjectURL(firstPhotos)} alt="Image_Photo" /> : null}  
                </span>
                <span className="image-upload position-relative">
               
			<input
				type="file"
				className="opacity-0 position-absolute"
                {...register("second_image")}
                
				onChange={handleSecondInputChange}
                />
                 {secondPhotos ? <img className="uploaded-img" src={URL.createObjectURL(secondPhotos)} alt="Image_Photo" /> : null}   
                </span>
                <span className="image-upload">
                {thirdPhotos ? <img className="uploaded-img" src={URL.createObjectURL(thirdPhotos)} alt="Image_Photo" /> : null}   
			<input
				type="file"
				className="opacity-0"
                {...register("third_image")}
				onChange={handleThirdInputChange}
                />
                </span>
                </form>
		</div>
	);
};

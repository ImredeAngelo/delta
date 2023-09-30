import React from 'react'
import Lottie from 'lottie-react'
import Animation from './mail.json'
import s from './verify.css'

export default function Verification() {
    return (
        <div>
            <h3>Hei</h3>
            <div className={s.box}>
                <Lottie animationData={Animation} loop={true}
                    className={s.anim}
                />
                <div>
                    Vi har send deg en mail!
                </div>
            </div>
        </div>
    )
}

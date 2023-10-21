import React, { Suspense, lazy } from 'react'
import Animation from './mail.json'
import s from './verify.css'

const Lottie = lazy(() => import("lottie-react"))

export default function Verification() {
    return (
        <div className={s.box}>
            <Suspense fallback={<h2>Laster...</h2>}>
                <Lottie animationData={Animation} loop={true}
                    className={s.anim}
                />
            </Suspense>
            <div>
                Vi har sendt deg en mail!
            </div>
        </div>
    )
}

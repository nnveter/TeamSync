import React, {useEffect} from 'react';

function Alert(props) {

    useEffect(() => {
        if (props.sost) {
            let x = document.querySelector(".alertBox")
            x.classList.remove("alert2")
            setTimeout(() => {
                if (x) {
                    x.classList.add("alert2")
                }
                setTimeout(() => {
                    props.func(false)
                }, 1500)
            }, 5000)
        }
    }, [props.sost])

    return (
        <>
            <div className="alertBox">
                <div className="alert">{props.message}</div>
            </div>
        </>
    )
}


export default Alert;

import React, { useState, useImperativeHandle } from 'react'
import PropTypes from "prop-types"


//tän togglable komponentin tarkoitus on vastata tarpeeseen luoda ehdollista
//komponentin renderöintiä, eli jos halutaan näyttää vain tietty osa jostain kokonaisuudesta
//tämä näyttää staten ollessa false vain yhden buttonin, jolla voidaan muuttaa
//komponentin statea ja sen muuttuessa trueksi voidaan renderöidä komponentin
//lapsi komponentit
//lisäksi renderöidään myös nappi, jonka avulla voidaan muuttaa state takaisin

//kääritään kompponentti funktio forwardRef funktiokutsun sisälle, näin
//komponentti pääsee käsiksi sille määriteltyyn refiin
const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = visible ? { display: "none" } : { display : "" }
    const showWhenVisible = !visible ? { display: "none" } : { display : "" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    //tämä puolestaan on hookki, jonka avulla tarjotaan
    //komponentin sisäisesti määritelty funktio ulkopuolelta kutsuttavaksi
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    //näytä ensin login nappula jos visible on false
    //kun visible true niin näytä lapset ja cancel nappula, joka vaihtaa visible statea
    return (

        <div>
            <div style = {hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style = {showWhenVisible}>
                {props.children}
                <div>
                    <button onClick={toggleVisibility}>Cancel</button>
                </div>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
export default Togglable
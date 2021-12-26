import React from 'react'

function SidePanel(props) {
    return (
        <div className={'sidePanel '+props.classNames}>            
            {props.children}
            <div className='sidePanelArrow'>                  
                \
                <br/>
                /                 
            </div>
        </div>
    )
}

export default SidePanel

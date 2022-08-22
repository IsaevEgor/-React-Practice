import React from "react";
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible, setModal}) => {

	const rootClasses = [classes.myModal]

	if(visible) {
		rootClasses.push(classes.active);
	}

	return (
		<div onClick={() => setModal(false)} className={rootClasses.join(' ')}>
			<div onClick={(e) => e.stopPropagation()} className={classes.myModalContent}>
				{children}
			</div>
		</div>
	)
}

export default MyModal;
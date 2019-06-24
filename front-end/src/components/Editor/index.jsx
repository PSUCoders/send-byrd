import React from "react";
import Jodit from "./Jodit";
import sendByrdLogo from "../../assets/sendbyrd-logo.svg";
import styles from "./styles.module.css";

const Editor = () => {
	return (
		<div className={styles.editor}>
			<div className={styles.container}>
				<aside className={styles["left-container"]}>
					<img src={sendByrdLogo} alt="" />
					<h1>Editor</h1>
				</aside>
				<aside className={styles["right-container"]}>
					<Jodit />
				</aside>
			</div>
		</div>
	);
};

export default Editor;

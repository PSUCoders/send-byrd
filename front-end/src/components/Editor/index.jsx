import React from "react";
import Jodit from "./Jodit";
import sendByrdLogo from "../../assets/sendbyrd-logo.svg";
import styles from "./styles.module.css";
import TemplateCard from "./TemplateCard";

const Editor = () => {
	return (
		<div className={styles.editor}>
			<div className={styles.container}>
				<aside className={styles["left-container"]}>
					<img src={sendByrdLogo} alt="" />
					<h1>Welcome to SendByrd</h1>
					<h3>
						Create a custom email from scratch or pick one of our templates
					</h3>
					<div className={styles.templates}>
						{[1, 2, 3, 4].map(num => {
							return <TemplateCard key={num} />;
						})}
					</div>
				</aside>
				<aside className={styles["right-container"]}>
					<Jodit />
				</aside>
			</div>
		</div>
	);
};

export default Editor;

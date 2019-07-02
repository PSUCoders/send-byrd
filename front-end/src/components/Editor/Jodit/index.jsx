import React, { Component } from "react";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";

class CustomEditor extends Component {
	state = {
		content: "content"
	};

	updateContent = value => {
		this.setState({ content: value });
	};

	/**
	 * @property Jodit jodit instance of native Jodit
	 */
	jodit;
	setRef = jodit => (this.jodit = jodit);

	config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	};

	render() {
		return (
			<JoditEditor
				editorRef={this.setRef}
				value={this.state.content}
				config={this.config}
				onChange={this.updateContent}
			/>
		);
	}
}

export default CustomEditor;

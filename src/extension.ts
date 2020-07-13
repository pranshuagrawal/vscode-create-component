import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { CONSTANTS } from './constants';
import { buildReactTemplate } from './utility/react';
import { buildVueTemplate } from './utility/vue';
import { buildReactNativeTemplate } from './utility/react-native';
import { create } from 'domain';

export function activate(context: vscode.ExtensionContext) {

	console.log('Active');

	context.subscriptions.push(
		vscode.commands.registerCommand("extension.createComponent", execute)
	);
}

function validate(componentName: string): string | null {  
	if (!componentName || componentName === "") {
	  	return "component name can not be empty";
	}
	if (!componentName.match(/^[A-Z]/)) {
		return "component name has to start with a uppercase alphabet";
	}
	if (!componentName.match(/^[0-9a-zA-Z]+$/)) {
		return "component can't have non-alphanumeric character";
	}
	return null;
}

const execute = ({fsPath}: {fsPath: string}) => {

	const componentNameOptions: vscode.InputBoxOptions = {
		prompt: `Component will be created at ${fsPath}`,
		placeHolder: "Enter Component Name",
		validateInput: validate,
		ignoreFocusOut: true
	};
 
	const frameworkSelection = [
		CONSTANTS.FRAMEWORKS.REACTJS,
		CONSTANTS.FRAMEWORKS.VUEJS,
		CONSTANTS.FRAMEWORKS.REACTNATIVE
	];

	const frameworkSelectionOptions = {
		canPickMany: false,
		placeHolder: "Select Framework / Library",
		ignoreFocusOut: true
	};

	const featureSelection = [
		CONSTANTS.FEATURES.TS,
		CONSTANTS.FEATURES.STORYBOOK
	];

	const featureSelectionOptions = {
		canPickMany: true,
		placeHolder: "Select features to be included",
		ignoreFocusOut: true
	};


	vscode.window.showQuickPick(frameworkSelection, frameworkSelectionOptions).then(selectedFramework => {

		if(!selectedFramework){
			return;
		}

		if(selectedFramework !== CONSTANTS.FRAMEWORKS.REACTNATIVE){
			featureSelection.push(CONSTANTS.FEATURES.STYLING_SCSS);
		}

		vscode.window.showQuickPick(featureSelection, featureSelectionOptions).then(selectedFeatures=> {
			vscode.window.showInputBox(componentNameOptions).then(componentName => {

				if(typeof componentName === "string") {
					const ComponentFolder = path.join(fsPath, componentName);
					try {
						fs.mkdirSync(ComponentFolder);
						if(selectedFramework === CONSTANTS.FRAMEWORKS.REACTJS){
							buildReactTemplate(selectedFeatures, componentName, ComponentFolder);
						}
						else if(selectedFramework === CONSTANTS.FRAMEWORKS.VUEJS){
							buildVueTemplate(selectedFeatures, componentName, ComponentFolder);
						}
						else if(selectedFramework === CONSTANTS.FRAMEWORKS.REACTNATIVE){
							buildReactNativeTemplate(selectedFeatures, componentName, ComponentFolder);
						}
					}
					catch(error) {
						vscode.window.showErrorMessage(`Could not create the component. ${error}`);
					}
				}
				
			});
		});
	});

};

export function deactivate() {}
import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import REACT_NATIVE_TEMPLATES from '../templates/react-native';
import { CONSTANTS } from '../constants';

export const buildReactNativeTemplate = (config: any, componentName: string, cPath: string) => {
    
    // let stylingExtension = config.includes(CONSTANTS.FEATURES.STYLING_SCSS) ? ".scss" : ".css";
    let indexExtension = config.includes(CONSTANTS.FEATURES.TS) ? ".ts" : ".js";

    const FILE_NAMES = {
        component: `${componentName}${indexExtension}`,
        componentIndex: `index${indexExtension}`,
        storybook: `${componentName}.stories${indexExtension}`
    };

    const COMPONENT_TEMPLATE = config.includes(CONSTANTS.FEATURES.TS) === ".ts" ? REACT_NATIVE_TEMPLATES.TS_TEMPLATE : REACT_NATIVE_TEMPLATES.JS_TEMPLATE;
    
    // Writing main component file
    const componentMainResponse = fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.component
        ),
        mustache.render(COMPONENT_TEMPLATE, {componentName})
    );

    // Writing component index file
    const componentIndexResponse = fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.componentIndex
        ),
        mustache.render(REACT_NATIVE_TEMPLATES.INDEX, {componentName})
    );

    // Writing storybook file
    if(config.includes(CONSTANTS.FEATURES.STORYBOOK)) {
        const componentStylingResponse = fs.writeFileSync(
            path.join(
                cPath,
                FILE_NAMES.storybook
            ),
            mustache.render(REACT_NATIVE_TEMPLATES.STORYBOOK, {componentName})
        );
    }

}
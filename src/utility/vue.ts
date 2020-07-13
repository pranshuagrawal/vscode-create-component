import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import VUE_TEMPLATES from '../templates/vue';
import { CONSTANTS } from '../constants';

export const buildVueTemplate = (config: any, componentName: string, cPath: string) => {
    
    let stylingExtension = config.includes(CONSTANTS.FEATURES.STYLING_SCSS) ? ".scss" : ".css";
    let indexExtension = config.includes(CONSTANTS.FEATURES.TS) ? ".ts" : ".js";
    let componentExtension = `.vue`;

    const FILE_NAMES = {
        styleDir: `style`,
        styling: `style/index${stylingExtension}`,
        component: `${componentName}${componentExtension}`,
        componentIndex: `index${indexExtension}`,
        storybook: `${componentName}.stories${indexExtension}`
    };

    const COMPONENT_TEMPLATE = config.includes(CONSTANTS.FEATURES.TS) === ".ts" ? VUE_TEMPLATES.TS_TEMPLATE : VUE_TEMPLATES.JS_TEMPLATE;
    
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
        mustache.render(VUE_TEMPLATES.INDEX, {componentName})
    );
    
    // Creating style directory
    const componentStyleDirResponse = fs.mkdirSync(path.join(
        cPath,
        FILE_NAMES.styleDir
    ));

    // Writing component styling file
    const componentStylingResponse = fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.styling
        ),
        mustache.render(VUE_TEMPLATES.STYLING, {componentName})
    );

    // Writing storybook file
    if(config.includes(CONSTANTS.FEATURES.STORYBOOK)) {
        const componentStylingResponse = fs.writeFileSync(
            path.join(
                cPath,
                FILE_NAMES.storybook
            ),
            mustache.render(VUE_TEMPLATES.STORYBOOK, {componentName})
        );
    }

}
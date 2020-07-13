export default {
    JS_TEMPLATE: `
import React, { Fragment } from 'react';
import './styles/index{{StyleExtension}}';

const {{componentName}} = (props) => {
    return <Fragment></Fragment>;
};

export default {{componentName}}
`,
    TS_TEMPLATE: `
import React, { Fragment } from 'react';
import './styles/index{{StyleExtension}}';

interface I{{componentName}}Props {

}

const {{componentName}}: React.SFC<I{{componentName}}Props> = (props) => {
    return <Fragment></Fragment>;
}

export default {{componentName}};
`,
    STORYBOOK: `
import React, {Fragment} from 'react';
import {{componentName}} from './{{componentName}}';

export default {title: 'Component|{{componentName}}'};

export const {{componentName}}Example = () => (
    <Fragment>
        <{{componentName}} />
    </Fragment>
);
`,
    INDEX: `
import {{componentName}} from './{{componentName}}';
export default {{componentName}};    
`,
    STYLING: ``
};
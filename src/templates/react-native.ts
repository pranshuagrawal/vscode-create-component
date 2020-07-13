export default {
    JS_TEMPLATE: `
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const {{componentName}} = (props) => {
    return (
        <View style=<%={{...styles.container}}=%>>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
});

export default {{componentName}};
`,
    TS_TEMPLATE: `
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface I{{componentName}}Props {

}

const {{componentName}}: React.FC<I{{componentName}}Props> = (props) => {
    return <View></View>;
}

const styles = StyleSheet.create({
    container: {

    }
});

export default {{componentName}};
`,
    STORYBOOK: `
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {{componentName}} from './{{componentName}}';

const {{componentName}}Example = () => <{{componentName}} />;

storiesOf('{{componentName}}', module).add('Example', () => (
    <{{componentName}}Example />
));
`,
    INDEX: `
import {{componentName}} from './{{componentName}}';
export default {{componentName}};    
`,
};
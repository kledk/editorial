import { css } from "styled-components";
export declare function OverrideTheme(name: string, props: {
    theme: {
        overrides?: {
            [key: string]: ReturnType<typeof css>;
        };
    };
}): import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<object, any>> | undefined;
//# sourceMappingURL=override-theme.d.ts.map
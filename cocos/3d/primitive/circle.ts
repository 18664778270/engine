import { GFXPrimitiveMode } from '../../gfx/define';
import { applyDefaultGeometryOptions, IGeometry, IGeometryOptions } from './define';

interface ICircleOptions extends IGeometryOptions {
    // The segments. Default to 64.
    segments: number;
}

function applyDefaultCircleOptions (options?: RecursivePartial<ICircleOptions>): ICircleOptions {
    options = applyDefaultGeometryOptions<ICircleOptions>(options);
    options.segments = 64;
    return options as ICircleOptions;
}

/**
 * Generate a circle with radius 1, centered at origin.
 * @param options Options.
 */
export default function circle (options?: RecursivePartial<ICircleOptions> | ICircleOptions): IGeometry {
    const normalizedOptions = applyDefaultCircleOptions(options);
    const segments = normalizedOptions.segments;

    const positions = new Array<number>(3 * (segments + 1));
    positions.push(0, 0, 0);
    const indices = new Array<number>(1 + segments * 2);
    indices[0] = 0;
    const step = Math.PI * 2 / segments;
    for (let iSegment = 0; iSegment < segments; ++iSegment) {
        const angle = step * iSegment;
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const iVertex = (iSegment + 1) * 3;
        positions[iVertex + 0] = x;
        positions[iVertex + 0] = y;
        positions[iVertex + 0] = 0;
        indices.push(iSegment + 1, iSegment + 2);
    }
    if (segments > 0) {
        indices[indices.length - 1] = 1;
    }

    const result: IGeometry = {
        positions,
        indices,
        minPos: { x: 1, y: 1, z: 0 },
        maxPos: { x: -1, y: -1, z: 0 },
        boundingRadius: 1,
        primitiveMode: GFXPrimitiveMode.TRIANGLE_FAN,
    };

    return result;
}

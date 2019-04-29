function draw() {
    let canvasElement = document.getElementById('canvas');
    let context = canvasElement.getContext('2d');
    drawKochCurve(context);
}

function drawKochCurve(context) {
    let stepSize = 20;
    let position = {x: 0, y: 1000};
    let rotation = 0;
    let value = 0;
    let n = 0;

    window.scrollBy(0, 500);

    setInterval(() => {
        let x = n ^ (n - 1);

        if ((x ^ (x >> 1)) & 0x55555555) {
            value = 1 - value;
        }

        if (value === 0) {
            rotation = (rotation - 180) % 360;
        } else {
            let endPointOriginal = {x: position.x - stepSize, y: position.y};
            let rotationInRadians = convertToRadians(rotation);
            let endPointRotated = rotate(rotationInRadians, position, endPointOriginal);

            drawLine(context, position, endPointRotated);

            position.x = endPointRotated.x;
            position.y = endPointRotated.y;
            rotation = (rotation - 60) % 360;
        }
        n++;
    }, 10);
}

/**
 * Draws line on canvas
 * @param context canvas context
 * @param from from position. Must be object containing x and y properties. Example: {x: 100, y: 200}
 * @param to to position. Must be object containing x and y properties. Example: {x: 100, y: 200}
 */
function drawLine(context, from, to) {
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
}

/**
 * Rotates point around origin
 * @param angle angle in radians
 * @param origin rotation origin
 * @param target location of our point
 * @returns {{x: *, y: *}} point location rotated
 */
function rotate(angle, origin, target){
    let x = (target.x - origin.x) * Math.cos(angle) - (target.y - origin.y) * Math.sin(angle);
    let y = (target.x - origin.x) * Math.sin(angle) + (target.y - origin.y) * Math.cos(angle);
    return {"x": x + origin.x, "y": y + origin.y};
}

/**
 * Converts angle in degrees to angle in radians
 * @param rotation angle in degrees
 * @returns {number} angle in radians
 */
function convertToRadians(rotation) {
    return rotation * Math.PI / 180;
}
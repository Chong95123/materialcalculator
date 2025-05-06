document.getElementById('mode').addEventListener('change', updateMode);
document.querySelectorAll('input').forEach(input => input.addEventListener('input', updateResults));

function updateMode() {
    const mode = document.getElementById('mode').value;
    document.querySelectorAll('.mode').forEach(modeDiv => modeDiv.style.display = 'none');
    document.getElementById(mode).style.display = 'block';
    updateResults();  // Update results after mode change
}

function updateResults() {
    const mode = document.getElementById('mode').value;

    if (mode === 'paint') {
        const wallLength = parseFloat(document.getElementById('wallLength').value);
        const wallHeight = parseFloat(document.getElementById('wallHeight').value);
        const doorArea = parseFloat(document.getElementById('doorArea').value) || 0;

        if (isValid(wallLength, wallHeight)) {
            const totalArea = (wallLength * wallHeight) - doorArea;
            const paintLitres = totalArea / 40;
            const undercoatLitres = paintLitres * 0.4;
            document.getElementById('result').textContent = `You need ${paintLitres.toFixed(2)} litres of paint and ${undercoatLitres.toFixed(2)} litres of undercoat.`;
        } else {
            document.getElementById('result').textContent = 'Invalid input. Please check your entries.';
        }

    } else if (mode === 'tiles') {
        const floorLength = parseFloat(document.getElementById('floorLength').value);
        const floorWidth = parseFloat(document.getElementById('floorWidth').value);
        const tileLength = parseFloat(document.getElementById('tileLength').value);
        const tileWidth = parseFloat(document.getElementById('tileWidth').value);
        const tilePrice = parseFloat(document.getElementById('tilePrice').value);

        if (isValid(floorLength, floorWidth, tileLength, tileWidth, tilePrice)) {
            const area = floorLength * floorWidth;
            const tileArea = tileLength * tileWidth;
            const tilesNeeded = Math.ceil(area / tileArea * 1.1); // 10% wastage
            const totalCost = tilesNeeded * tilePrice;
            document.getElementById('result').textContent = `${tilesNeeded} tiles needed (incl. 10% wastage). Total cost: RM ${totalCost.toFixed(2)}.`;
        } else {
            document.getElementById('result').textContent = 'Invalid input. Please check your entries.';
        }

    } else if (mode === 'plasterCeiling') {
        const ceilingLength = parseFloat(document.getElementById('ceilingLength').value);
        const ceilingWidth = parseFloat(document.getElementById('ceilingWidth').value);

        if (isValid(ceilingLength, ceilingWidth)) {
            const ceilingArea = ceilingLength * ceilingWidth;
            const boardsNeeded = Math.ceil(ceilingArea / 24); // 6x4 boards
            const metalStuds = Math.ceil((ceilingArea / 100) * 20); // 20 studs per 100 sqft
            document.getElementById('result').textContent = `${boardsNeeded} boards and ${metalStuds} metal studs (12ft each) needed.`;
        } else {
            document.getElementById('result').textContent = 'Invalid input. Please check your entries.';
        }

    } else if (mode === 'plasterWall') {
        const wallLength2 = parseFloat(document.getElementById('wallLength2').value);
        const wallHeight2 = parseFloat(document.getElementById('wallHeight2').value);
        const doorArea2 = parseFloat(document.getElementById('doorArea2').value) || 0;

        if (isValid(wallLength2, wallHeight2)) {
            const wallArea = (wallLength2 * wallHeight2) - doorArea2;
            const boardsNeeded = Math.ceil(wallArea / 32); // Assume 4x8 boards
            const metalStuds = Math.ceil((wallArea / 100) * 15); // 15 studs per 100 sqft
            document.getElementById('result').textContent = `${boardsNeeded} boards and ${metalStuds} metal studs required.`;
        } else {
            document.getElementById('result').textContent = 'Invalid input. Please check your entries.';
        }

    } else if (mode === 'wallpaper') {
        const wallLength3 = parseFloat(document.getElementById('wallLength3').value);
        const wallHeight3 = parseFloat(document.getElementById('wallHeight3').value);
        const wallpaperWidth = parseFloat(document.getElementById('wallpaperWidth').value);

        if (isValid(wallLength3, wallHeight3, wallpaperWidth)) {
            const stripsNeeded = Math.ceil(wallLength3 / wallpaperWidth);
            const totalLength = stripsNeeded * wallHeight3;
            document.getElementById('result').textContent = `${stripsNeeded} strips needed. Total length: ${totalLength.toFixed(2)} ft.`;
        } else {
            document.getElementById('result').textContent = 'Invalid input. Please check your entries.';
        }
    }
}

function isValid(...values) {
    return values.every(value => !isNaN(value) && value > 0);
}

updateMode();  // Initialize the first mode

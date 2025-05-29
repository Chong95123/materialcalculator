document.getElementById('mode').addEventListener('change', updateMode);
document.querySelectorAll('input').forEach(input => input.addEventListener('input', updateResults));

function updateMode() {
    const mode = document.getElementById('mode').value;

    // Hide all mode sections
    document.querySelectorAll('.mode').forEach(modeDiv => modeDiv.style.display = 'none');

    // Show selected mode section
    const selectedDiv = document.getElementById(mode);
    if (selectedDiv) {
        selectedDiv.style.display = 'block';
    } else {
        document.getElementById('result').textContent = 'Invalid mode selected.';
        return;
    }

    updateResults();
}

function updateResults() {
    const mode = document.getElementById('mode').value;
    const resultDiv = document.getElementById('result');

    if (mode === 'paint') {
        const wallLength = parseFloat(document.getElementById('wallLength').value);
        const wallHeight = parseFloat(document.getElementById('wallHeight').value);
        const doorArea = parseFloat(document.getElementById('doorArea').value) || 0;

        if (isValid(wallLength, wallHeight)) {
            const totalArea = (wallLength * wallHeight) - doorArea;
            const paintLitres = totalArea / 40;
            const undercoatLitres = paintLitres * 0.4;
            resultDiv.textContent = `You need ${paintLitres.toFixed(2)} litres of paint and ${undercoatLitres.toFixed(2)} litres of undercoat.`;
        } else {
            resultDiv.textContent = 'Invalid input. Please check your entries.';
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
            resultDiv.textContent = `${tilesNeeded} tiles needed (incl. 10% wastage). Total cost: RM ${totalCost.toFixed(2)}.`;
        } else {
            resultDiv.textContent = 'Invalid input. Please check your entries.';
        }

    } else if (mode === 'plasterCeiling') {
        const ceilingLength = parseFloat(document.getElementById('ceilingLength').value);
        const ceilingWidth = parseFloat(document.getElementById('ceilingWidth').value);

        if (isValid(ceilingLength, ceilingWidth)) {
            const ceilingArea = ceilingLength * ceilingWidth;
            const boardsNeeded = Math.ceil(ceilingArea / 24); // 6x4 boards = 24 sqft
            const metalStuds = Math.ceil((ceilingArea / 100) * 20); // 20 studs per 100 sqft
            resultDiv.textContent = `${boardsNeeded} boards and ${metalStuds} metal studs (12ft each) needed.`;
        } else {
            resultDiv.textContent = 'Invalid input. Please check your entries.';
        }

    } else if (mode === 'plasterWall') {
        const wallLength2 = parseFloat(document.getElementById('wallLength2').value);
        const wallHeight2 = parseFloat(document.getElementById('wallHeight2').value);
        const doorArea2 = parseFloat(document.getElementById('doorArea2').value) || 0;

        if (isValid(wallLength2, wallHeight2)) {
            const wallArea = (wallLength2 * wallHeight2) - doorArea2;
            const boardsNeeded = Math.ceil(wallArea / 32); // 4x8 boards = 32 sqft
            const metalStuds = Math.ceil((wallArea / 100) * 15); // 15 studs per 100 sqft
            resultDiv.textContent = `${boardsNeeded} boards and ${metalStuds} metal studs required.`;
        } else {
            resultDiv.textContent = 'Invalid input. Please check your entries.';
        }

    } else if (mode === 'wallpaper') {
        const wallLength3 = parseFloat(document.getElementById('wallLength3').value);
        const wallHeight3 = parseFloat(document.getElementById('wallHeight3').value);
        const wallpaperWidth = parseFloat(document.getElementById('wallpaperWidth').value);

        if (isValid(wallLength3, wallHeight3, wallpaperWidth)) {
            const stripsNeeded = Math.ceil(wallLength3 / wallpaperWidth);
            const totalLength = stripsNeeded * wallHeight3;
            resultDiv.textContent = `${stripsNeeded} strips needed. Total length: ${totalLength.toFixed(2)} ft.`;
        } else {
            resultDiv.textContent = 'Invalid input. Please check your entries.';
        }

    } else if (mode === 'fluted') {
        const sqft = parseFloat(document.getElementById('flutedSqft').value) || 0;

        if (sqft <= 0) {
            resultDiv.textContent = "Please enter a valid wall size.";
        } else {
            const totalArea = sqft;

            // Calculate plywood and fluted panels
            const plywoodCoverage = 4 * 8; // 32 sqft per plywood sheet
            const flutedCoverage = 4 * 10; // 40 sqft per fluted panel
            const totalPlywood = Math.ceil(totalArea / plywoodCoverage);
            const totalFluted = Math.ceil(totalArea / flutedCoverage);

            // Estimate dimensions assuming a square wall
            const wallSideFt = Math.sqrt(totalArea);
            const wallWidthCm = wallSideFt * 30.48;
            const wallHeightCm = wallSideFt * 30.48;

            // Wooden stick calculation
            const calculateWoodenSticks = (widthCm, heightCm) => {
                const verticalCount = Math.ceil(widthCm / 50) + 1;
                const horizontalCount = Math.ceil(heightCm / 50) + 1;
                const totalVerticalLength = verticalCount * (heightCm / 30.48);
                const totalHorizontalLength = horizontalCount * (widthCm / 30.48);
                const totalLength = totalVerticalLength + totalHorizontalLength;
                return {
                    sticks: Math.ceil(totalLength / 12),
                    vertical: verticalCount,
                    horizontal: horizontalCount
                };
            };

            const sticksResult = calculateWoodenSticks(wallWidthCm, wallHeightCm);

            resultDiv.innerHTML = `
                Total Wall Area: ${totalArea.toFixed(2)} sqft<br>
                Plywood Needed (4ft x 8ft): ${totalPlywood} sheets<br>
                - 8ft*4ft Place vertical<br>
                Fluted Panels Needed (4ft x 10ft): ${totalFluted} panels<br>
                - 10ft*4ft Place vertical<br>
                Wooden Stick Grid (50cm×50cm): ${sticksResult.sticks}<br>
                - Vertical sticks: ${sticksResult.vertical} (full height)<br>
                - Horizontal sticks: ${sticksResult.horizontal} (full width)<br><br>
            `;
        }

    } else {
        resultDiv.textContent = "Invalid mode selected.";
    }
}

function isValid(...values) {
    return values.every(value => !isNaN(value) && value > 0);
}

// Initialize
updateMode();
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const playButton = document.getElementById('play-button');
    const levelSelect = document.getElementById('level-select');

    const colors = [
        "Purple", "DarkSlateBlue", "MediumPurple", "Thistle",
        "SteelBlue", "LightSteelBlue", "MediumSlateBlue", "CornflowerBlue",
        "LightBlue", "Lavender", "LightPink", "PaleVioletRed",
        "PaleTurquoise", "LightSeaGreen", "CadetBlue"
    ];

    const tubes = [];
    let selectedTube = null;
    let levelCount = 1;

    function chooseLevel(level) {
        levelCount = level;
        document.getElementById("level-count").textContent = levelCount;
        // 修正：切換選單時也要重新初始化遊戲畫面
        createTubes();
        fillTubes();
    }

    levelSelect.addEventListener("change", (event) => {
        const selectedLevel = parseInt(event.target.value, 10);
        chooseLevel(selectedLevel);
    });

    function checkGameState() {
        const allSameColor = (tube) => {
            const waters = Array.from(tube.children);
            return (
                waters.length === 4 &&
                waters.every(
                    (water) => water.style.backgroundColor === waters[0].style.backgroundColor
                )
            );
        };

        let completedTubes = 0;
        tubes.forEach((tube) => {
            if (allSameColor(tube)) {
                completedTubes++;
            }
        });
        document.getElementById("completed-tubes-count").textContent = completedTubes;

        // 檢查是否所有的試管都完成或者是空試管
        if (tubes.every((tube) => tube.childElementCount === 0 || allSameColor(tube))) {
            // 延遲一下下跳通知，讓玩家先看到最後一滴水倒完的畫面
            setTimeout(() => {
                if (levelCount === 10) {
                    alert("恭喜!你已經完成所有挑戰!!");
                } else {
                    alert("你已經完成本關卡!");
                    levelCount++;
                    levelSelect.value = levelCount; // 同步更新下拉選單的顯示
                    document.getElementById("level-count").textContent = levelCount;
                    document.getElementById("completed-tubes-count").textContent = 0;
                    createTubes();
                    fillTubes();
                }
            }, 100);
        }
    }

    function pourWater(fromTube, toTube) {
        let fromWater = fromTube.querySelector(".water:last-child");
        let toWater = toTube.querySelector(".water:last-child");

        // 安全檢查：如果來源試管根本沒水，什麼都不做
        if (!fromWater) return;

        // 如果目標試管是空的
        if (!toWater) {
            const targetColor = fromWater.style.backgroundColor;
            // 連續倒出相同顏色的水，直到顏色不同或目標管滿了(最多4層)
            while (
                fromWater &&
                fromWater.style.backgroundColor === targetColor &&
                toTube.childElementCount < 4
            ) {
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child");
            }
        } else {
            // 如果目標試管有水，先固定住目標試管最頂層的顏色
            const targetColor = toWater.style.backgroundColor;
            
            // 修正點：必須確認來源水的顏色與「目標試管原本頂層的顏色」相同
            while (
                fromWater &&
                fromWater.style.backgroundColor === targetColor &&
                toTube.childElementCount < 4
            ) {
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child");
            }
        }
        checkGameState();
    }

    function selectTube(tube) {
        if (selectedTube) {
            if (selectedTube !== tube) {
                pourWater(selectedTube, tube);
            }
            selectedTube.classList.remove("selected");
            selectedTube = null;
        } else {
            // 安全檢查：不能選擇空試管作為起點
            if (tube.childElementCount === 0) return;
            
            selectedTube = tube;
            tube.classList.add("selected");
        }
    }

    function createTubes() {
        gameBoard.innerHTML = "";
        tubes.length = 0;

        for (let i = 0; i < levelCount + 1; i++) {
            const tube = document.createElement("div");
            tube.classList.add("tube");
            tube.addEventListener("click", () => selectTube(tube));
            gameBoard.appendChild(tube);
            tubes.push(tube);
        }

        // 新增兩管空的試管來當作緩衝使用
        for (let i = 0; i < 2; i++) {
            const emptyTube = document.createElement("div");
            emptyTube.classList.add("tube");
            emptyTube.addEventListener("click", () => selectTube(emptyTube));
            gameBoard.appendChild(emptyTube);
            tubes.push(emptyTube);
        }
    }

    function fillTubes() {
        const gameColors = colors.slice(0, Math.min(levelCount + 1, colors.length));
        const waterBlocks = [];

        gameColors.forEach((color) => {
            for (let i = 0; i < 4; i++) {
                waterBlocks.push(color);
            }
        });

        // 打亂顏色
        waterBlocks.sort(() => 0.5 - Math.random());

        let blockIndex = 0;
        tubes.slice(0, levelCount + 1).forEach((tube) => {
            for (let i = 0; i < 4; i++) {
                if (blockIndex < waterBlocks.length) {
                    const water = document.createElement("div");
                    water.classList.add("water");
                    water.style.backgroundColor = waterBlocks[blockIndex];
                    water.style.height = "25%"; // 修正：既然一管最多4層，每層高度應該是 25% 才會剛好填滿
                    tube.appendChild(water);
                    blockIndex++;
                }
            }
        });
    }

    playButton.addEventListener("click", () => {
        createTubes();
        fillTubes();
    });
    
    // 初始化外觀
    createTubes();
    fillTubes();
});
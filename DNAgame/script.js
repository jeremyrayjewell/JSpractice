let specimenNum = 1;
const DNA_BASES = ['A', 'T', 'C', 'G'];

// Mapping of first DNA base to image filenames for various stages
const organismImageMap = {
    'A': ['1org.png', '1org_stage2.png', '1org_stage3.png'],
    'T': ['2org.png', '2org_stage2.png', '2org_stage3.png'],
    'C': ['3org.png', '3org_stage2.png', '3org_stage3.png'],
    'G': ['4org.png', '4org_stage2.png', '4org_stage3.png'],
};

const returnRandBase = () => {
    return DNA_BASES[Math.floor(Math.random() * DNA_BASES.length)];
}

const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
}

const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum: specimenNum,
        dna: dna,
        generations: 1,
        mutate() {
            const randomIndex = Math.floor(Math.random() * this.dna.length);
            const currentBase = this.dna[randomIndex];
            const possibleBases = DNA_BASES.filter(base => base !== currentBase);
            const newBase = possibleBases[Math.floor(Math.random() * possibleBases.length)];
            this.dna[randomIndex] = newBase;
            this.generations++;
            return this.dna;
        },
        willLikelySurvive() {
            const cAndGCount = this.dna.filter(base => base === 'C' || base === 'G').length;
            return (cAndGCount / this.dna.length) >= 0.6;
        },
        getOrganismImage() {
            const baseImage = organismImageMap[this.dna[0]];
            const stage = Math.min(this.generations - 1, baseImage.length - 1);
            return baseImage[stage];
        },
    };
};

let organism = pAequorFactory(specimenNum, mockUpStrand());
const sickImages = ["sick1.png", "sick2.png", "sick3.png"];

// Create three lines of DNA information, each containing up to 5 characters
const dnaLines = [];
for (let i = 0; i < organism.dna.length; i += 5) {
    dnaLines.push(organism.dna.slice(i, i + 5).join(''));
}

// Combine the lines with line breaks
const dnaInfo = dnaLines.join('\n');

function generateOrganism() {
    organism = pAequorFactory(++specimenNum, mockUpStrand());

    // Generate a formatted DNA string
    const dnaInfo = organism.dna.join('').match(/.{1,5}/g).join('\n');

    document.getElementById("organism").textContent = "GEN: (" + organism.generations + ") - DNA:\n" + dnaInfo;
    updateSurvivalStatus();
    updateSickImage();
    updateOrganismImage();
    
    // Unhide the organism image
    const organismImage = document.getElementById("organismImage");
    organismImage.classList.remove("hidden");
}

function mutateOrganism() {
    if (organism.willLikelySurvive()) {
        organism.mutate();

        // Generate a formatted DNA string
        const dnaInfo = organism.dna.join('').match(/.{1,5}/g).join('\n');

        document.getElementById("organism").textContent = "GEN: (" + organism.generations + ") - DNA:\n" + dnaInfo;
        updateSurvivalStatus();
        updateSickImage();
        updateOrganismImage();
    }
}


function updateSurvivalStatus() {
    if (organism.willLikelySurvive()) {
        document.getElementById("survival").textContent = "Success";
    } else {
        document.getElementById("survival").textContent = "Failure";
    }
    updateSickImage();
}

function updateSickImage() {
    const sickImage = document.getElementById("sickImage");
    
    if (!organism.willLikelySurvive()) {
        const randomSickImage = sickImages[Math.floor(Math.random() * sickImages.length)];
        sickImage.src = randomSickImage;
        sickImage.style.visibility = "visible"; // Show the image by changing visibility
    } else {
        sickImage.style.visibility = "hidden"; // Hide the image by changing visibility
    }
}

function updateOrganismImage() {
    const organismImage = document.getElementById("organismImage");
    const imageFileName = organism.getOrganismImage();
    organismImage.src = imageFileName;
}

document.getElementById("generateButton").addEventListener("click", generateOrganism);
document.getElementById("mutateButton").addEventListener("click", mutateOrganism);

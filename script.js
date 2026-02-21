// ===================================
// Navigation & Mobile Menu
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Mobile navigation toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ===================================
// Profile Image Handling
// ===================================
const profileImage = document.getElementById('profileImage');
const imagePlaceholder = document.getElementById('imagePlaceholder');

if (profileImage && imagePlaceholder) {
    profileImage.addEventListener('error', () => {
        profileImage.style.display = 'none';
        imagePlaceholder.style.display = 'flex';
    });

    profileImage.addEventListener('load', () => {
        profileImage.style.display = 'block';
        imagePlaceholder.style.display = 'none';
    });
}

// ===================================
// Google Scholar Publications Fetcher
// ===================================
const GOOGLE_SCHOLAR_USER_ID = '52zp7VkAAAAJ';

async function fetchSemanticScholarPublications(authorName = 'Lavsen Dahal') {
    const loadingEl = document.getElementById('publicationsLoading');
    const listEl = document.getElementById('publicationsList');
    const errorEl = document.getElementById('publicationsError');
    const fallbackEl = document.getElementById('fallbackPublications');

    if (!loadingEl || !listEl) return; // Not on publications page

    try {
        loadingEl.style.display = 'block';
        if (errorEl) errorEl.style.display = 'none';
        if (fallbackEl) fallbackEl.style.display = 'none';

        // Try to fetch from Semantic Scholar using Google Scholar ID mapping
        // First, try with the author name to find their Semantic Scholar ID
        const searchUrl = `https://api.semanticscholar.org/graph/v1/author/search?query=${encodeURIComponent(authorName)}`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.data && searchData.data.length > 0) {
            // Find the best match
            let authorId = searchData.data[0].authorId;

            // Try to find exact match with Google Scholar ID if available
            const exactMatch = searchData.data.find(author =>
                author.externalIds?.GoogleScholar === GOOGLE_SCHOLAR_USER_ID
            );
            if (exactMatch) {
                authorId = exactMatch.authorId;
            }

            // Fetch author's papers
            const papersUrl = `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers?fields=title,year,authors,venue,citationCount,url,externalIds&limit=100`;
            const papersResponse = await fetch(papersUrl);
            const papersData = await papersResponse.json();

            if (papersData.data && papersData.data.length > 0) {
                displayPublicationsByYear(papersData.data);
                loadingEl.style.display = 'none';
                listEl.style.display = 'block';
                return;
            }
        }

        // If no papers found, show fallback
        throw new Error('No publications found');

    } catch (error) {
        console.error('Error fetching publications:', error);
        loadingEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'block';
        if (fallbackEl) fallbackEl.style.display = 'block';
    }
}

function displayPublicationsByYear(papers) {
    const listEl = document.getElementById('publicationsList');
    if (!listEl) return;

    listEl.innerHTML = '';

    // Sort by year (most recent first)
    papers.sort((a, b) => (b.year || 0) - (a.year || 0));

    // Group by year
    const papersByYear = {};
    papers.forEach(paper => {
        const year = paper.year || 'Unknown';
        if (!papersByYear[year]) {
            papersByYear[year] = [];
        }
        papersByYear[year].push(paper);
    });

    // Display by year groups
    Object.keys(papersByYear).sort((a, b) => b - a).forEach(year => {
        const yearGroup = document.createElement('div');
        yearGroup.className = 'pub-year-group';

        const yearHeading = document.createElement('h3');
        yearHeading.className = 'year-heading';
        yearHeading.textContent = year;
        yearGroup.appendChild(yearHeading);

        papersByYear[year].forEach(paper => {
            const pubItem = createPublicationElement(paper);
            yearGroup.appendChild(pubItem);
        });

        listEl.appendChild(yearGroup);
    });
}

function createPublicationElement(paper) {
    const item = document.createElement('div');
    item.className = 'pub-item-full';

    const title = document.createElement('div');
    title.className = 'pub-title';
    title.textContent = paper.title;

    const authors = document.createElement('div');
    authors.className = 'pub-authors';
    const authorsList = paper.authors.map(a => a.name).join(', ');
    authors.innerHTML = highlightAuthor(authorsList, 'L. Dahal');

    const venue = document.createElement('div');
    venue.className = 'pub-venue';
    venue.textContent = paper.venue || 'Venue not specified';

    item.appendChild(title);
    item.appendChild(authors);
    item.appendChild(venue);

    // Add metadata
    const meta = document.createElement('div');
    meta.className = 'pub-meta';

    if (paper.venue) {
        const type = document.createElement('span');
        type.className = 'pub-type';
        type.textContent = detectPubType(paper.venue);
        meta.appendChild(type);
    }

    if (paper.citationCount !== undefined) {
        const citations = document.createElement('span');
        citations.className = 'pub-citations';
        citations.innerHTML = `<i class="fas fa-quote-left"></i> ${paper.citationCount} citations`;
        meta.appendChild(citations);
    }

    if (meta.children.length > 0) {
        item.appendChild(meta);
    }

    // Add links
    const links = document.createElement('div');
    links.className = 'pub-links';

    if (paper.url) {
        const link = document.createElement('a');
        link.href = paper.url;
        link.target = '_blank';
        link.innerHTML = '<i class="fas fa-external-link-alt"></i> paper';
        links.appendChild(link);
    }

    if (paper.externalIds?.DOI) {
        const doi = document.createElement('a');
        doi.href = `https://doi.org/${paper.externalIds.DOI}`;
        doi.target = '_blank';
        doi.innerHTML = '<i class="fas fa-link"></i> doi';
        links.appendChild(doi);
    }

    if (paper.externalIds?.ArXiv) {
        const arxiv = document.createElement('a');
        arxiv.href = `https://arxiv.org/abs/${paper.externalIds.ArXiv}`;
        arxiv.target = '_blank';
        arxiv.innerHTML = '<i class="fas fa-file-pdf"></i> arxiv';
        links.appendChild(arxiv);
    }

    if (links.children.length > 0) {
        item.appendChild(links);
    }

    return item;
}

function highlightAuthor(authorsList, authorName) {
    return authorsList.replace(new RegExp(authorName, 'gi'), `<strong>${authorName}</strong>`);
}

function detectPubType(venue) {
    const venueLower = venue.toLowerCase();
    if (venueLower.includes('arxiv') || venueLower.includes('preprint')) {
        return 'preprint';
    } else if (venueLower.includes('journal') || venueLower.includes('transactions')) {
        return 'journal';
    } else if (venueLower.includes('conference') || venueLower.includes('workshop')) {
        return 'conference';
    } else {
        return 'publication';
    }
}

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Initialize
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    // Check if we're on publications page and auto-fetch
    if (window.location.pathname.includes('publications.html')) {
        // Note: The auto-fetch is triggered by inline script in publications.html
        // This is just a fallback
        if (typeof fetchSemanticScholarPublications === 'function' &&
            document.getElementById('publicationsList')) {
            setTimeout(() => {
                if (document.getElementById('publicationsLoading').style.display !== 'none') {
                    fetchSemanticScholarPublications('Lavsen Dahal');
                }
            }, 100);
        }
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchSemanticScholarPublications };
}

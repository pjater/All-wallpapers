// Theme handling and small UI helpers
(function(){
	const KEY = 'aw_theme';
	const root = document.documentElement;

	function applyTheme(theme){
		if(theme === 'dark') root.setAttribute('data-theme','dark');
		else root.removeAttribute('data-theme');
	}

	// initialize from localStorage or prefers-color-scheme
	const saved = localStorage.getItem(KEY);
	if(saved){
		applyTheme(saved);
	} else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
		applyTheme('dark');
	}

	// sync any toggle inputs
	function syncToggles(){
		const checked = root.getAttribute('data-theme') === 'dark';
		document.querySelectorAll('#themeSwitch, #themeSwitchLib').forEach(i=>{ i.checked = checked; });
	}
	syncToggles();

	function setThemeFromToggle(checked){
		const theme = checked ? 'dark' : 'light';
		applyTheme(theme);
		localStorage.setItem(KEY, theme);
		syncToggles();
	}

	document.addEventListener('change', (e)=>{
		if(e.target && (e.target.id === 'themeSwitch' || e.target.id === 'themeSwitchLib')){
			setThemeFromToggle(e.target.checked);
		}
	});

	// active nav link highlight
	const navLinks = document.querySelectorAll('.nav-link');
	const path = location.pathname.split('/').pop();
	navLinks.forEach(a=>{ if(a.getAttribute('href') === path || (path === '' && a.getAttribute('href').includes('index'))) a.classList.add('active') });

	// set dynamic years
	const y = new Date().getFullYear();
	const el = document.getElementById('year'); if(el) el.textContent = y;
	const el2 = document.getElementById('yearLib'); if(el2) el2.textContent = y;

	// Populate library placeholders when on library page
	const grid = document.getElementById('gridContainer');
	if(grid){
		const tpl = document.getElementById('placeholderTpl');
		const count = 12;
		for(let i=0;i<count;i++){
			const node = tpl.content.cloneNode(true);
			grid.appendChild(node);
		}
	}

	// small accessibility: enable space/enter on explore button
	const explore = document.getElementById('exploreBtn');
	if(explore){
		explore.addEventListener('keydown', (e)=>{
			if(e.key === ' ' || e.key === 'Enter') explore.click();
		});
	}

	// Enhanced theme toggle functionality
	function toggleTheme(event) {
		const theme = event.target.checked ? 'dark' : 'light';
		applyTheme(theme);
		localStorage.setItem(KEY, theme);
	}

	document.addEventListener('DOMContentLoaded', () => {
		syncTheme();

		const themeSwitch = document.querySelector('#themeSwitch');
		if (themeSwitch) {
			themeSwitch.checked = root.getAttribute('data-theme') === 'dark';
			themeSwitch.addEventListener('change', toggleTheme);
		}

		const grid = document.getElementById('gridContainer');
		if (grid) {
			const template = document.getElementById('placeholderTpl');
			for (let i = 0; i < 12; i++) {
				const clone = template.content.cloneNode(true);
				grid.appendChild(clone);
			}
		}

		const elements = document.querySelectorAll('.hero-title, .hero-tagline, .btn-explore');
		elements.forEach((el, index) => {
			el.style.animation = `fadeIn 0.5s ease ${index * 0.2}s forwards`;
		});
	});

	function syncTheme() {
		const savedTheme = localStorage.getItem(KEY);
		if (savedTheme) {
			applyTheme(savedTheme);
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			applyTheme(prefersDark ? 'dark' : 'light');
		}
	}

})()

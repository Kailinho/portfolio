document.addEventListener('DOMContentLoaded', function () {
	const hamburger = document.querySelector('.hamburger')
	const navMenu = document.querySelector('.nav__list')
	const scrollBtn = document.querySelector('#scroll__top')

	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active')
		navMenu.classList.toggle('active')
	})

	document.querySelectorAll('.nav__link').forEach((n) =>
		n.addEventListener('click', () => {
			hamburger.classList.remove('active')
			navMenu.classList.remove('active')
		})
	)

	var prevScrollpos = window.scrollY

	window.onscroll = scrollAnimation
	document.body.ontouchmove = scrollAnimation
	function scrollAnimation() {
		var topPos = document.documentElement.scrollTop
		var currentScrollPos = window.scrollY

		if (prevScrollpos > currentScrollPos && topPos <= 20) {
			navMenu.style.top = '80px'
		} else {
			navMenu.style.top = '-300px'
		}
		prevScrollpos = currentScrollPos > 0 ? currentScrollPos : prevScrollpos

		if (topPos > 100) {
			scrollBtn.classList.add('show')
		} else {
			scrollBtn.classList.remove('show')
		}
	}

	scrollBtn.addEventListener('click', (e) => {
		e.preventDefault()
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})

	let loadedProjects = []

	// Render projects from JSON
	fetch('projects.json')
		.then((response) => response.json())
		.then((projects) => {
			loadedProjects = projects
			const container = document.getElementById('projects__content')
			if (!container) return
			container.innerHTML = ''
			projects.forEach((project, idx) => {
				const card = document.createElement('div')
				card.className = 'project__card'
				card.setAttribute('tabindex', '0')
				card.setAttribute('role', 'button')
				card.setAttribute(
					'aria-label',
					`Open details for ${project.title}`
				)
				card.dataset.projectIdx = idx
				card.innerHTML = `
					<div class="project__image-wrapper">
						<img src="${project.image}" alt="${project.title}" class="project__image" />
					</div>
					<div class="project__info">
						<div class="tech-icons">
							${
								Array.isArray(project.techstack) &&
								project.techstack.length > 0
									? project.techstack
											.map(
												(tech) =>
													`<img src="${tech.icon}" alt="${tech.name}" title="${tech.name}" class="tech-icon" />`
											)
											.join('')
									: ''
							}
						</div>
						<h2 class="project__title">${project.title}</h2>
						<p class="project__description">${project.description}</p>
						<div class="project__buttons">
							${
								project.url
									? `<a href="${project.url}" target="_blank" class="project__btn" tabindex="0" aria-label="View Website for ${project.title}">View Website</a>`
									: ''
							}
							<a href="${
								project.github
							}" target="_blank" class="project__btn" tabindex="0" aria-label="View GitHub for ${
					project.title
				}">GitHub</a>
						</div>
					</div>
				`
				container.appendChild(card)
			})
		})
})

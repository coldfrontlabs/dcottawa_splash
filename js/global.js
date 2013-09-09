(function($) {
	/**
	 * Width at which the responsive design shifts
	 *  between desktop and mobile
	 */
	var threshold = 760;

	/**
	 * How much border to reveal at the top of the screen
	 *  when the menu is hidden.
	 */
	var borderHeight = 5;

	var previousWidth = 0;
	var previousOffsetY = 0;

	/**
	 * Check the window width when page loads. This must be performed after
	 * document.readyState === "complete", which may come after window.onload
	 */
	function onComplete() {
		if (document.body.clientWidth < threshold) {
			var offsetY = $('#top-bar').height() - borderHeight;
			window.scroll(0, offsetY);
			previousOffsetY = offsetY;
		}
		previousWidth = document.body.clientWidth;
	}
	var readyStateCheckInterval = setInterval(function() {
	    if (document.readyState === "complete") {
	        onComplete();
	        clearInterval(readyStateCheckInterval);
	    }
	}, 10);

	/**
	 * Document ready
	 */
	$(function() {
		// Set the window resize event to hide the menu in mobile mode
		$(window).resize(function() {
			var offsetY = $('#top-bar').height() - borderHeight;

			// If we just crossed the threshold from wide to narrow, then scroll the
			//  window to hide the mobile menu.
			if (document.body.clientWidth < threshold &&
				  previousWidth >= threshold &&
				  window.scrollY <= offsetY
			) {
				window.scroll(0, offsetY);
			}

			// Otherwise, if the threshold was crossed from narrow to wide, scroll
			// back to the top.
			else if (document.body.clientWidth >= threshold &&
							 previousWidth < threshold &&
							 window.scrollY <= previousOffsetY
			) {
				window.scroll(0, 0);
			}

			// Update the previous sizes
			previousWidth = document.body.clientWidth;
			previousOffsetY = offsetY;
		});

		// Set the uoZone click to pull down the menu
		$('#menu-pulldown a').click(function(e) {
			// Stop the anchor's default click event
			e.preventDefault();

			var offsetY = $('#top-bar').height() - borderHeight;

			// If scrolled to the top of the window, the button hides the menu.
			if (window.scrollY == 0 && document.body.clientWidth < threshold) {
				$('html,body').animate({ scrollTop: offsetY }, 600);
			}
			// Otherwise the button reveals the menu.
			else if (document.body.clientWidth < threshold) {
				$('html,body').animate({ scrollTop: 0 }, 600);
			}
		});
	});
})(jQuery);
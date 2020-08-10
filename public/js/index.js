let parameters;

(function () {
	console.log("load");

	function getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	/**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
	$.ajax({
		url: "/api/albums/all",
		method: "GET",
	}).then(function (response) {
		console.log(response);
		processResponse(response);
	});

	function processResponse(response) {
		var html = "";
		for (var i = 0; i < response.length; i++) {
			var spotify_id = response[i].spotify_id;
			var imgURLMed = response[i].imgURLMed;
			var title = response[i].title;
			var artist = response[i].artist;

			html += `<div class="album-card bg-green-500 p-8 ml-64 max-w-lg text-center rounded overflow-hidden shadow-lg" data-id="${spotify_id}">`;
			html += `<img class="w-full" src = "${imgURLMed}" alt = "Album Cover" id = "album-cover-large" />`;
			html += "<div class=\"px-6 py-4\"></div>";
			html += "<div class=\"font-bold text-xl mb-2\">";
			html += `<h3 class="text-black" id="album-title">${title}</h3>`;
			html += `<h4 class="text-black" id="artist-title">${artist}</h4>`;
			html += "</div>";
			html += "</div >";
		}
		$("#all-albums").append(html);

		$(".album-card").on("click", function (event) {
			console.log($(this).data("id"));

			$.ajax({
				url: `/albums/:id`,
				method: "POST",
				data: { token: parameters.access_token, id: $(this).data("id") },
			}).then(function (response) {
				console.log(response);
				$("").text(JSON.stringify(response));
			});
		});
	}


	
	// get token from url
	parameters = getHashParams();

	if (parameters.access_token) {
		// delete token from url
		document.location.href = document.location.href.slice(
			0,
			document.location.href.indexOf("access_token")
		);

		$("#login").hide();
	} else {
		$("#login").show();
	}
})();
console.log(parameters);

$("#album-search").on("click", function (event) {
	console.log("test");
	event.preventDefault();

	var album = $("#search-input").val();

	$.ajax({
		url: `/api/search/${album}`,
		method: "GET",
	}).then(function (response) {
		$("").text(JSON.stringify(response));
	});
});

$("#submit-comment").on("click", function (event) {
	console.log("dummy2");
	var text = $("#comment-text").val();
	$.ajax({
		url: `/api/comment/${text}`,
		method: "POST",
	}).then(function (response) {
		$("").text(JSON.stringify(response));
	});
});

$("#album-add").on("click", function (event) {
	var id = $("#id-input").val();
	id = id.split(":");
	id = id[2];
	console.log(id);

	if (parameters.access_token) {
		console.log("albumAdd");
		$.ajax({
			url: `/add/${id}/${parameters.access_token}`,
			method: "GET",
		}).then(function (response) {
			$("").text(JSON.stringify(response));
		});
	}
});

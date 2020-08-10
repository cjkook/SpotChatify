let token;

(function () {
	console.log("load");
	/**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
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
	// get token from url
	token = getHashParams();

	if (token.access_token) {
		// delete token from url
		document.location.href = document.location.href.slice(
			0,
			document.location.href.indexOf("access_token")
		);
	} else {
	}
})();
console.log(token);
$("#album-search").on("click", function (event) {
	console.log("test");
	event.preventDefault();

	var album = $("#search-input").val();

	$.ajax({
		url: "",
		method: "GET",
	}).then(function (response) {
		$("").text(JSON.stringify(response));
	});
});
$(".album-card").on("click", function (event) {
	console.log("dummy");

	$.ajax({
		url: "",
		method: "GET",
	}).then(function (response) {
		$("").text(JSON.stringify(response));
	});
});

$("#submit-comment").on("click", function (event) {
	console.log("dummy2");
  var text = $("#comment-text").val();
	$.ajax({
		url: "",
		method: "POST",
	}).then(function (response) {
		$("").text(JSON.stringify(response));
	});
});

$("#album-add").on("click", function (event) {
	console.log("albumAdd");
  var id = $("#id-input").val();
  console.log(id)

	if (token.length > 1) {
		$.ajax({
			url: `/add/${id}/${token}`,
			method: "POST",
		}).then(function (response) {
			$("").text(JSON.stringify(response));
		});
	}
});

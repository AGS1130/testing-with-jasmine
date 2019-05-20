// This is the spec file that contains the Jasmine tests

window.addEventListener('DOMContentLoaded', () => {
    /* This suite is about the RSSfeeds definitions.
     * The `allFeeds` variable in our application.
     */
    describe('RSS Feeds', function () {
        // Make sure the `allFeeds` variable is defined and is not empty.
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the `allFeeds` object.
         * Ensure the URL is defined and the URL is not empty.
         */
        it('have URL\'s', function () {
            allFeeds.forEach(value => {
                expect(value.url).toBeDefined();
                expect(value.url.length).not.toBe(0);
            })
        })

        /* Loops through each feed in the `allFeeds` object.
         * Ensure name is defined and the name is not empty.
         */
        it('have names', function () {
            allFeeds.forEach(value => {
                expect(value.name).toBeDefined();
                expect(value.name.length).not.toBe(0);
            })
        })
    });

    /* This suite is about the side menu.
     * The side menu is the main navigation for the `header` tag.
     */
    describe('The menu', function () {
        // Define reusable variables for DOM
        beforeEach(function () {
            $body = document.querySelector('body');
            $slideMenuButton = document.querySelector('.menu-icon-link');
        })

        // Ensure the menu element is hidden by default.
        it('is hidden by default', function () {
            expect($body).toHaveClass('menu-hidden');
        });

        // Ensure the menu element changes state on user click events.
        it('changes visibility when clicked', function () {
            // Simulate first click
            $slideMenuButton.click();
            expect($body).not.toHaveClass('menu-hidden');

            // Simulate second click
            $slideMenuButton.click();
            expect($body).toHaveClass('menu-hidden');
        });
    });

    /* This suite is about the entries nested in `.feed`.
     * Loaded from a POST request.
     */
    describe('Initial Entries', function () {
        // Load asynchronous content from `loadFeed` function
        beforeEach(function (done) {
            loadFeed(1, done);
        });

        /* Ensure the loadFeed invocation populates at least
         * a single `.entry` element within the `.feed` container.
         */
        it('populates with at least one entry', function () {
            const $entries = document.querySelectorAll('.feed .entry');
            expect($entries.length).toBeGreaterThan(0);
        });
    });

    /* This suite is about populating new entries.
     * They should be different.
     */
    describe('New Feed Selection', function () {

        /* Initialize two NodeLists
         * after two different `loadFeed` invocations
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                $firstEntries = document.querySelectorAll('.feed .entry-link');

                loadFeed(1, function () {
                    $secondEntries = document.querySelectorAll('.feed .entry-link');

                    // Finished async POST requests
                    done();
                });
            });
        });

        /* Ensure a new feed is loaded by the `loadFeed` function
         * that the content actually changes.
         */
        it('should load different entries', function () {
            if ($firstEntries.length === $secondEntries.length) {

                // links should be different
                $firstEntries.forEach((value, index) => {
                    let firsLink = value.href;
                    let secondLink = $secondEntries[index].href;

                    expect(firsLink).not.toBe(secondLink);
                })
            } else {
                expect($firstEntries.length).not.toBe($secondEntries.length);
            }
        });
    });
});
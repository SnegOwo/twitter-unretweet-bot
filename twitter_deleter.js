/**
 * twitter_deleter_v2_final_FINAL.js
 * // i made this to delete rts
 * // pls dont ban me twitter
 */

var stuff = {
    MAX_TO_DELETE: 50,    // how many to delete
    FAST_WAIT: 2500,      // wait time min
    SLOW_WAIT: 6000,      // wait time max
    BREAK_TIME: 10,       // take a break after this many
    LONG_NAP: 20000       // nap time in ms
};

// sound maker for when job is done
function make_noise(type) {
    try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (type === "error") {
            osc.type = 'sawtooth';
            osc.frequency.value = 150; // low error buzz
        } else {
            osc.type = 'sine';
            osc.frequency.value = 500; // happy ding
        }
        
        osc.start();
        
        // stop sound after small time
        setTimeout(function() {
            osc.stop();
        }, 300);
    } catch (e) {
        console.log("cant make sound lol");
    }
}

// helper to sleep
function wait_a_sec(ms) {
    return new Promise(r => setTimeout(r, ms));
}

// random number gen
function get_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// MAIN FUNCTION
async function start_hacking() {
    console.log(">>> SCRIPT STARTED... pls wait");
    
    var count = 0;
    var errors = 0;
    var attempts = 0;

    // main loop
    while (count < stuff.MAX_TO_DELETE) {
        
        // check if broken
        if (errors >= 3) {
            console.log("!!! TOO MANY ERRORS. STOPPING !!!");
            make_noise("error");
            break;
        }

        // coffee break logic
        if (count > 0 && count % stuff.BREAK_TIME === 0) {
            console.log("--- taking a nap for " + (stuff.LONG_NAP/1000) + "s ---");
            await wait_a_sec(stuff.LONG_NAP);
        }

        // find the green buttons
        // data-testid="unretweet" is the magic key
        var buttons = Array.from(document.querySelectorAll('[data-testid="unretweet"]'));

        if (buttons.length === 0) {
            console.log("cant see buttons, scrolling down...");
            window.scrollTo(0, document.body.scrollHeight);
            await wait_a_sec(4000); 
            
            attempts++;
            if (attempts > 5) {
                console.log("cant find anything else. im done.");
                make_noise("success");
                break;
            }
            continue;
        }

        attempts = 0; // reset scroll attempts

        // click loop
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];

            // double check limit inside loop
            if (count >= stuff.MAX_TO_DELETE) break;

            try {
                // scroll to it so it looks real
                btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // random wait before click
                await wait_a_sec(get_random(1000, 2000));

                // click the retweet button
                btn.click();
                
                // wait for menu
                await wait_a_sec(get_random(500, 1000));

                // click the confirm button in popup
                var confirm_btn = document.querySelector('[data-testid="unretweetConfirm"]');

                if (confirm_btn) {
                    confirm_btn.click();
                    count++;
                    errors = 0; // reset errors cuz it worked
                    
                    console.log("deleted " + count + " / " + stuff.MAX_TO_DELETE);

                    // IMPORTANT: random wait so we dont look like robot
                    await wait_a_sec(get_random(stuff.FAST_WAIT, stuff.SLOW_WAIT));

                } else {
                    console.log("??? menu didnt open ???");
                    errors++;
                    // click body to close weird menus
                    document.body.click(); 
                    await wait_a_sec(1000);
                }

            } catch (err) {
                console.log("some weird error happened: " + err);
                errors++;
            }
        }
        
        // scroll a bit more
        window.scrollBy(0, 300);
        await wait_a_sec(1000);
    }

    console.log(">>> JOB DONE. DELETED: " + count);
    if (count >= stuff.MAX_TO_DELETE) {
        make_noise("success");
    }
}

// run it
start_hacking();

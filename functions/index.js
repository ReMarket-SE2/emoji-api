const { setGlobalOptions } =  require("firebase-functions/v2");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
setGlobalOptions({ region: 'europe-west1' });
// Get the counter value with emoji-based label
exports.getCounter = functions.https.onRequest(async (req, res) => {
    const counterName = req.query.name;
    
    if (!counterName) {
        return res.status(400).json({ error: "Missing 'name' query parameter" });
    }

    const counterRef = db.collection("counters").doc(counterName);
    const doc = await counterRef.get();
    const counterValue = doc.exists ? doc.data().value : 0;

    // Determine label based on counter name
    let label = "counter";
    if (counterName.startsWith("like")) {
        label = "👍";
    } else if (counterName.startsWith("dislike")) {
        label = "👎";
    }

    // Response in required format
    res.json({
        schemaVersion: 1,
        label: label,
        message: counterValue.toString(),
        color: "orange"
    });
});

// Increment the counter with query param
exports.incrementCounter = functions.https.onRequest(async (req, res) => {
    const counterName = req.query.name;
    
    if (!counterName) {
        return res.status(400).json({ error: "Missing 'name' query parameter" });
    }

    const counterRef = db.collection("counters").doc(counterName);

    await db.runTransaction(async (t) => {
        const doc = await t.get(counterRef);
        const newValue = doc.exists ? doc.data().value + 1 : 1;
        t.set(counterRef, { value: newValue });
    });

    res.json({ message: "Counter updated", counter: counterName });
});

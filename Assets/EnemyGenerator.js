#pragma strict
var interval : float = 1; // 敵の発生周期
var interval_add : float = 0.1; // 敵の発生周期をどのくらい狭めるか
var interval_addtime : float = 10.0; // 敵の発生周期を狭める時間
var enemyPrefab : GameObject;
private var timer : float;
private var intervalTimer : float;
function Start () {
    timer = 0.0;
    intervalTimer = 0.0;
}
function Update () {
    timer -= Time.deltaTime;
    if (timer < 0.0) {
        var offsetX: float = Random.Range(-38.0, 38.0);
        var offsetZ: float = Random.Range(40, 50);
        var position : Vector3 = Vector3(offsetX, 0, offsetZ);
        // 敵を発生させる.
        Instantiate(enemyPrefab, position, transform.rotation);
        timer = interval;
    }
    // 時間が経つにつれ敵の出現間隔を狭めていく.
    intervalTimer += Time.deltaTime;
    if (intervalTimer > interval_addtime && interval > 0.1) {
        intervalTimer = 0.0;
        interval -= interval_add;
    }
}
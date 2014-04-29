#pragma strict

var enemyBulletPrefab : GameObject;
var bulletTime : float = 0.0;
var bulletInterval : float = 1.0;

var explodePrefab : GameObject;

function Start () {
    var velocity = transform.position;
    // 速度はランダムにしとく.
    velocity.z = Random.Range(-200.0, -600.0);
    velocity.x = 0;
    rigidbody.AddForce(velocity);
}

function Update () {
    if (bulletTime > bulletInterval) {
        bulletTime = 0;
        var bullet = Instantiate(enemyBulletPrefab, transform.position, transform.rotation);
        var bullet_velocity = bullet.transform.position;
        bullet_velocity.z = -800;
        bullet_velocity.x = 0;
        bullet.rigidbody.AddForce(bullet_velocity);
    }
    bulletTime += Time.deltaTime;
}

function OnTriggerEnter (other : Collider) {
    if (other.gameObject.tag == "Player") {
        // プレイヤーにダメージを与える。説明は次で。
        other.gameObject.SendMessage("ApplyDamage");
    } else if (other.gameObject.tag == "Bullet") {
        Instantiate(explodePrefab, transform.position, Quaternion.AngleAxis(90,Vector3.right));
        Destroy(gameObject);
    } else {
        Destroy(gameObject);
    }
}
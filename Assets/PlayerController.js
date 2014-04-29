#pragma strict
// 移動速度
var movingSpeed : float = 5.0;
private var controller : CharacterController;
private var velocity : Vector3;
// アニメーションで使う変数たち
var animationInterval : float = 0.1; // 画像を切替えるタイミング
var animationTimer : float = 0.0; // 時間計測用
var animationFlag : boolean = true; // どっちの画像を表示するかのフラグ

var bulletPrefab : GameObject;
var bulletInterval : float = 0.2;
var bulletEnable : boolean = true;
var bulletVelocity : float = 100;
var bulletTime : float = 0.0;

var explodePrefab : GameObject;

function Start () {
    controller = GetComponent(CharacterController);
}

function Update () {
    // 2Dのゲームなので y軸は常に0に設定しとく。
    transform.position.y=0;
    // 方向キーからの入力を取得
    velocity = Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
    // 移動速度を入力に掛ける
    velocity *= movingSpeed;
     
    // 移動
    // Time.deltaTime は前フレームとの時間を返してくる。
    // デフォルトでは 60FPS, 1Frame ≒ 0.017sec だが多少誤差が出るので
    // その差を吸収する為に deltaTime を使ってやる。
    controller.Move(velocity * Time.deltaTime);
    
    // マテリアルに設定したテクスチャーの Offset を変更する事で
    // 画像をずらして表示する事ができます。
    // それを高速でずらす事でアニメーションを実現します。
    // ずらすのが 0.51 と半端なのは画像作成時にちょっとずれたので...。
    animationTimer -= Time.deltaTime;
    if (animationTimer < 0.0) {
        animationTimer = animationInterval;
        renderer.material.mainTextureOffset.x = animationFlag ? 0.51 : 0;
        animationFlag = !animationFlag;
    }

    // Jumpボタン(通常はSpaceキー)で弾を発射する
    if (Input.GetButton("Jump") && bulletEnable) {
        bulletEnable = false;
        // 弾をプレハブから作成する。
        var bullet = Instantiate(bulletPrefab, transform.position, transform.rotation);
        // 弾の発射方向を指定, z軸を真っ直ぐ飛ぶようにした。
        var direction : Vector3 = Vector3(0,0,1);
        // 弾に対して力を加えてやると真っ直ぐ飛ぶ。
        bullet.rigidbody.AddForce(direction * bulletVelocity, ForceMode.VelocityChange);
    }
 
    // 弾の発射間隔を調節する。大体秒間5発ぐらい。
    bulletTime += Time.deltaTime;
    if (bulletTime > bulletInterval) {
        bulletTime = 0.0;
        bulletEnable = true;
    }
}

function ApplyDamage() {
    Instantiate(explodePrefab, transform.position, Quaternion.AngleAxis(90,Vector3.right));
    Destroy(gameObject);
}

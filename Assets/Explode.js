#pragma strict
var animationFrame = 0.1;
function Start () {
    var offsets = [
        [0.0,0.667],
        [0.2,0.667],
        [0.4,0.667],
        [0.6,0.667],
        [0.8,0.667],
        [0.0,0.333],
        [0.2,0.333],
        [0.4,0.333],
        [0.6,0.333],
        [0.8,0.333],
        [0.0,0.0]
        ];
    for (var i=0;i<offsets.length;i++) {
        renderer.material.mainTextureOffset.x = offsets[i][0];
        renderer.material.mainTextureOffset.y = offsets[i][1];
        yield WaitForSeconds(animationFrame);
    }
    Destroy(gameObject);
}

function Update () {

}
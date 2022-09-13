using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollow : MonoBehaviour
{
  public float smoothSpeed = 0.125f;
  public Vector3 offset;
  private Vector3 velocity = Vector3.zero;
  public GameObject player = null;

  public Camera camera;

  public IEnumerator Shake(float duration, float magnitude) {
    Vector3 originalPos = transform.localPosition;

    float elapsed = 0.0f;

    while (elapsed < duration){
      float x = Random.Range(-1f, 1f) * magnitude;
      float y = Random.Range(-1f, 1f) * magnitude;

      transform.localPosition = originalPos + new Vector3(x, y, 0);
      
      elapsed += Time.deltaTime;

      yield return null;
    }
    

    transform.localPosition = originalPos;
  }
  
  void Start(){
    camera = GetComponent<Camera>();
    AudioListener.volume = 1.4f;
  }

  // LateUpdate is called once per frame after update
  void FixedUpdate()
  {
    if(player != null){
      transform.position = Vector3.SmoothDamp(transform.position, 
      player.transform.position + offset, ref velocity, smoothSpeed);
    } else {
      camera.orthographicSize = 6f;
    }
  }
}

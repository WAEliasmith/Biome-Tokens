using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovePlayer : MonoBehaviour
{
  public AudioSource walkSound = null;

  public float currChrome = 0f;

  public Vector2 movement;
  public Rigidbody2D rb;
  public SpriteRenderer sr;
  public float speed = 0.04f;
  public float boost = 0.05f;

  public float freeze = 0f;

  public Sprite[] sprites;

  public Vector2 movedir;

  public int walkcycle = 0;
  public int walktime = 0;
  public int walkCycleSpeed = 8;

  void Update()
  {
    //sprite animation
    if(movement != new Vector2(0,0)){
      movedir = movement;
      //walking
      walktime ++;
      if (walktime > walkCycleSpeed){
        walkcycle++;
        walktime = 0;
      }
      if(walkcycle >= 4){
        walkcycle = 0;
      }

    } else {
      //not walking
      walkcycle = 0;
      walktime = 0;
    }

    if(movedir.y == -1){
      sr.sprite = sprites[0];
      if(walkcycle == 1){
        sr.sprite = sprites[4];
      } else if(walkcycle == 3){
        sr.sprite = sprites[8];
      }
    }
    else if(movedir.y == 1){
      sr.sprite = sprites[1];
      if(walkcycle == 1){
        sr.sprite = sprites[5];
      } else if(walkcycle == 3){
        sr.sprite = sprites[9];
      }
    }
    else if(movedir.x == 1){
      sr.sprite = sprites[2];
      if(walkcycle == 1){
        sr.sprite = sprites[6];
      } else if(walkcycle == 3){
        sr.sprite = sprites[10];
      }
    }
    else if(movedir.x == -1){
      sr.sprite = sprites[3];
      if(walkcycle == 1){
        sr.sprite = sprites[7];
      } else if(walkcycle == 3){
        sr.sprite = sprites[11];
      }
    }

  }
  // Start is called before the first frame update
  void Start()
  {
    rb = GetComponent<Rigidbody2D>();
  }

  // FixedUpdate is called once per physics
  void FixedUpdate()
  {
    movement.x = Input.GetAxis("Horizontal");
    movement.y = Input.GetAxis("Vertical");

    rb.MovePosition(rb.position + movement.normalized * speed);
  }

  void OnCollisionStay2D(Collision2D col)
  {
    if (col.transform.tag == null)
    {
      
    }
  }
}
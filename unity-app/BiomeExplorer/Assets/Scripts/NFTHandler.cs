using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NFTHandler : MonoBehaviour
{
  public GameObject Player = null;
  public GameObject InfoPanel = null;


  public float pollution = 0f;
  public string name = "name";
  public string oracle = "oracle";
  public string url = "https://upload.wikimedia.org/wikipedia/pt/7/73/Trollface.png";
  public SpriteRenderer sr = null;

  public Sprite[] sprites = new Sprite[10];

  // Start is called before the first frame update
  void Start()
  {
    Player = GameObject.Find("Player");
    InfoPanel = GameObject.Find("InfoPanel");
    sr.sprite = sprites[(int) (Mathf.Floor(100000f+7f*transform.position.x)%10)];
  }

  // Update is called once per frame
  void Update()
  {

    if (Vector3.Distance(Player.transform.position, gameObject.transform.position) < 5f){
      //fade in info panel
      InfoPanel.GetComponent<InfoPanel>().pollution = pollution;
      InfoPanel.GetComponent<InfoPanel>().name = name;
      InfoPanel.GetComponent<InfoPanel>().oracle = oracle;
      InfoPanel.GetComponent<InfoPanel>().fade += 0.1f;
      InfoPanel.GetComponent<InfoPanel>().Download(url);
    }
  }
}
